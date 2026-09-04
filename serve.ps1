# Local preview for compyra.com: run this, the browser opens, Ctrl+C stops it.
# A server is required because pages use pretty URLs (/services/) and
# root-absolute assets (/style.css), matching production exactly.
param([int]$Port = 8123)
Set-Location $PSScriptRoot
Start-Process "http://127.0.0.1:$Port/"
python -m http.server $Port --bind 127.0.0.1
