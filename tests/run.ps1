param([string]$Page = 'layout')

$ErrorActionPreference = 'Stop'
$root = 'c:\Temp\Git\compyra.com'
$out = Join-Path $env:TEMP "audit-$Page.html"
$prof = Join-Path $env:TEMP ("edgeaudit-" + [guid]::NewGuid().ToString('N'))
if (Test-Path $out) { Remove-Item $out -Force }

$server = Start-Process -FilePath 'python' -ArgumentList @('-m', 'http.server', '8745', '--bind', '127.0.0.1') -WorkingDirectory $root -PassThru -WindowStyle Hidden
Start-Sleep -Milliseconds 1200
try {
  $edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
  if (-not (Test-Path $edge)) { $edge = 'C:\Program Files\Microsoft\Edge\Application\msedge.exe' }
  $a = @('--headless=new', '--disable-gpu', '--no-sandbox',
    '--window-size=1600,1000', "--user-data-dir=$prof", '--virtual-time-budget=60000',
    "--dump-dom", "http://127.0.0.1:8745/tests/$Page.html")
  $p = Start-Process -FilePath $edge -ArgumentList $a -Wait -NoNewWindow -RedirectStandardOutput $out -PassThru
}
finally {
  if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }
  Remove-Item $prof -Recurse -Force -ErrorAction SilentlyContinue
}

$html = Get-Content $out -Raw -Encoding UTF8
if ($html -match '(?s)<pre id="out">(.*?)</pre>') {
  [System.Net.WebUtility]::HtmlDecode($Matches[1]).Trim()
} else {
  Write-Error 'no output pre found'
}

