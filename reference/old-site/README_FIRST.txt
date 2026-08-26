PIED-A-TERRE PROPERTY - FULL SITE CAPTURE
Captured 25 August 2026

WHAT IS IN THIS FOLDER
----------------------
  website_dump.txt      Complete verbatim text of every page on piedaterreproperty.co.uk,
                        in the exact block format that was requested. 16 page blocks
                        (14 live + 2 dead URLs), ~170 KB, UTF-8.
  image_manifest.csv    143 unique images: target filename, page, original URL,
                        full-resolution download URL, alt text, dimensions, and the
                        property or section each one belongs to.
  download_assets.ps1   Fetches the actual image files and page HTML onto this machine.
  README_FIRST.txt      This file.

HOW TO FINISH THE JOB
---------------------
Unzip everything into:
    C:\Users\jonny\Desktop\AgentHub\Projects\Piedaterre Property\

Then open PowerShell and run:
    cd "C:\Users\jonny\Desktop\AgentHub\Projects\Piedaterre Property"
    powershell -ExecutionPolicy Bypass -File .\download_assets.ps1

That creates site_images\ (143 images at full original resolution, named exactly as
the manifest says) and site_html\ (the raw HTML of all 14 live pages plus sitemap.xml,
requested 4 seconds apart so the host does not throttle). It also writes the real byte
size of every file back into image_manifest.csv. It is safe to re-run - anything already
downloaded is skipped.

WHY THE SCRIPT INSTEAD OF THE FILES THEMSELVES
----------------------------------------------
The capture ran in Anthropic's cloud, which has no outbound internet and no write access
to your Desktop. Everything reached me through the Chrome extension on your machine -
which is why the text and the manifest are complete, but the binaries have to be pulled
down locally. The script does that in about a minute.

CORRECTION TO THE ORIGINAL BRIEF
--------------------------------
The site is SQUARESPACE, not Wix. There are no /v1/fill/ transform segments to strip.
Squarespace resizes via a ?format= query parameter, so the full-resolution original is
the bare URL with ?format=original appended. The manifest and the script already do this.
The script also deliberately does not advertise WebP support, because the Squarespace CDN
will otherwise hand back WebP instead of the original JPEG/PNG; if a format mismatch
happens anyway, the script detects it from the file's magic bytes and corrects the
extension.

FIVE THINGS TO LOOK AT
----------------------
1. The whole fees comparison table on /feesandservicelevels is a flat 2500x2500 JPEG,
   not HTML - invisible to Google and to screen readers. All 16 rows x 3 columns were
   read visually and transcribed into website_dump.txt so you have the data as text.
2. Two internal links are 404: /services (linked 5 times, should be
   /feesandservicelevels) and /deposits (linked once, should be /holdingdeposits).
3. The page title of /holdingdeposits reads "Tennacy Deposits" - that misspelling is
   what search engines index.
4. The business is described three different ways: Emsworth (meta, footer, Rightmove),
   Havant (home page body), Portchester (the actual postal address).
5. /complaints-procedure is set to NOINDEX and is missing from sitemap.xml, despite TPO
   membership requiring it to be publicly available.

The full list of typos, malformed links and other findings is in the SITE-WIDE SUMMARY
at the end of website_dump.txt.

Nothing was submitted, sent, booked or paid for during this capture. It was read-only.
