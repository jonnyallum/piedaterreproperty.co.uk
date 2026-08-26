<#
  download_assets.ps1
  Pied-a-terre Property - image + HTML downloader

  Run this from the folder that contains image_manifest.csv, i.e.
      C:\Users\jonny\Desktop\AgentHub\Projects\Piedaterre Property\

  Usage (PowerShell, no admin needed):
      cd "C:\Users\jonny\Desktop\AgentHub\Projects\Piedaterre Property"
      powershell -ExecutionPolicy Bypass -File .\download_assets.ps1

  What it does:
    1. Creates site_images\ and site_html\ if they do not exist.
    2. Downloads every image listed in image_manifest.csv at full original
       resolution, named exactly as the manifest says.
    3. Rewrites image_manifest.csv with the real byte size of each file.
    4. Downloads the rendered HTML of every page into site_html\<slug>.html,
       paced at 4 seconds per request so the host does not throttle.

  Safe to re-run: files that already exist and are non-empty are skipped.
#>

$ErrorActionPreference = 'Stop'
$root      = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }
$imgDir    = Join-Path $root 'site_images'
$htmlDir   = Join-Path $root 'site_html'
$manifest  = Join-Path $root 'image_manifest.csv'
$UA        = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36'

# Squarespace content-negotiates on Accept: a browser that advertises WebP gets WebP back
# instead of the original JPEG/PNG. Deliberately do NOT advertise WebP, so we get originals.
$ImgHeaders = @{ 'Accept' = 'image/jpeg,image/png,image/gif,*/*;q=0.8' }

function Get-RealExtension([string]$path) {
    try { $b = [byte[]](Get-Content -Path $path -Encoding Byte -TotalCount 12) } catch { return $null }
    if ($b.Length -lt 12) { return $null }
    if ($b[0] -eq 0xFF -and $b[1] -eq 0xD8) { return '.jpg' }
    if ($b[0] -eq 0x89 -and $b[1] -eq 0x50 -and $b[2] -eq 0x4E -and $b[3] -eq 0x47) { return '.png' }
    if ($b[0] -eq 0x47 -and $b[1] -eq 0x49 -and $b[2] -eq 0x46) { return '.gif' }
    if ($b[0] -eq 0x52 -and $b[1] -eq 0x49 -and $b[2] -eq 0x46 -and $b[3] -eq 0x46 -and
        $b[8] -eq 0x57 -and $b[9] -eq 0x45 -and $b[10] -eq 0x42 -and $b[11] -eq 0x50) { return '.webp' }
    if ($b[0] -eq 0x3C) { return '.svg' }
    return $null
}

[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

New-Item -ItemType Directory -Force -Path $imgDir  | Out-Null
New-Item -ItemType Directory -Force -Path $htmlDir | Out-Null

if (-not (Test-Path $manifest)) { throw "image_manifest.csv not found next to this script ($manifest)" }

# ---------------------------------------------------------------- images ----
$rows = Import-Csv -Path $manifest
Write-Host "Downloading $($rows.Count) images into site_images\ ..." -ForegroundColor Cyan

$ok = 0; $skip = 0; $fail = 0
foreach ($r in $rows) {
    $dest = Join-Path $imgDir $r.filename

    if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 0)) {
        $r.bytes = (Get-Item $dest).Length
        $skip++
        continue
    }

    $urls = @($r.stripped_original_src, $r.original_src)
    if ($r.original_src -like '*images.squarespace-cdn.com*') {
        $urls += ($r.original_src + '?format=2500w')
        $urls += ($r.original_src + '?format=1500w')
    }

    $done = $false
    foreach ($u in ($urls | Select-Object -Unique)) {
        try {
            Invoke-WebRequest -Uri $u -OutFile $dest -UserAgent $UA -Headers $ImgHeaders -TimeoutSec 60
            if ((Get-Item $dest).Length -gt 0) {
                # If the CDN served a different format than the filename claims, fix the extension
                $real = Get-RealExtension $dest
                $have = [IO.Path]::GetExtension($r.filename).ToLower()
                if ($real -and $real -ne $have -and -not ($real -eq '.jpg' -and $have -eq '.jpeg')) {
                    $newName = [IO.Path]::GetFileNameWithoutExtension($r.filename) + $real
                    $newDest = Join-Path $imgDir $newName
                    Move-Item -Path $dest -Destination $newDest -Force
                    $r.filename = $newName
                    $dest = $newDest
                }
                $r.bytes = (Get-Item $dest).Length
                $done = $true
                break
            }
        } catch {
            # try the next candidate URL
        }
    }

    if ($done) {
        $ok++
        Write-Host ("  OK   {0}  ({1:N0} bytes)" -f $r.filename, [int]$r.bytes)
    } else {
        $fail++
        $r.bytes = 'FAILED'
        Write-Warning ("  FAIL {0}  <- {1}" -f $r.filename, $r.stripped_original_src)
    }
    Start-Sleep -Milliseconds 250
}

$rows | Export-Csv -Path $manifest -NoTypeInformation -Encoding UTF8
Write-Host "  (image_manifest.csv rewritten with real byte sizes and any corrected extensions)" -ForegroundColor DarkGray
Write-Host "Images: $ok downloaded, $skip already present, $fail failed." -ForegroundColor Green

# ------------------------------------------------------------------ html ----
$pages = @(
  @{ slug = 'index';                    url = 'https://piedaterreproperty.co.uk/' },
  @{ slug = 'home';                     url = 'https://piedaterreproperty.co.uk/home' },
  @{ slug = 'the-process';              url = 'https://piedaterreproperty.co.uk/the-process' },
  @{ slug = 'registerwithus';           url = 'https://piedaterreproperty.co.uk/registerwithus' },
  @{ slug = 'report-maintenance-issue'; url = 'https://piedaterreproperty.co.uk/report-maintenance-issue' },
  @{ slug = 'holdingdeposits';          url = 'https://piedaterreproperty.co.uk/holdingdeposits' },
  @{ slug = 'complaints-procedure';     url = 'https://piedaterreproperty.co.uk/complaints-procedure' },
  @{ slug = 'whychooseus';              url = 'https://piedaterreproperty.co.uk/whychooseus' },
  @{ slug = 'obligations';              url = 'https://piedaterreproperty.co.uk/obligations' },
  @{ slug = 'portfolio';                url = 'https://piedaterreproperty.co.uk/portfolio' },
  @{ slug = 'feesandservicelevels';     url = 'https://piedaterreproperty.co.uk/feesandservicelevels' },
  @{ slug = 'contactus';                url = 'https://piedaterreproperty.co.uk/contactus' },
  @{ slug = 'cookies';                  url = 'https://piedaterreproperty.co.uk/cookies' },
  @{ slug = 'privacy-policy';           url = 'https://piedaterreproperty.co.uk/privacy-policy' },
  @{ slug = 'sitemap';                  url = 'https://piedaterreproperty.co.uk/sitemap.xml' }
)

Write-Host "Downloading $($pages.Count) pages into site_html\ (4s apart) ..." -ForegroundColor Cyan
foreach ($p in $pages) {
    $ext  = if ($p.slug -eq 'sitemap') { '.xml' } else { '.html' }
    $dest = Join-Path $htmlDir ($p.slug + $ext)
    if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 0)) {
        Write-Host "  skip $($p.slug)$ext"
        continue
    }
    try {
        Invoke-WebRequest -Uri $p.url -OutFile $dest -UserAgent $UA -TimeoutSec 60
        Write-Host ("  OK   {0}{1}  ({2:N0} bytes)" -f $p.slug, $ext, (Get-Item $dest).Length)
    } catch {
        Write-Warning ("  FAIL {0} <- {1} : {2}" -f $p.slug, $p.url, $_.Exception.Message)
    }
    Start-Sleep -Seconds 4
}

Write-Host ""
Write-Host "Done. Images in site_images\, HTML in site_html\, byte sizes written back to image_manifest.csv." -ForegroundColor Green
