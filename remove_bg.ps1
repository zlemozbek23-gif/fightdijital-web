Add-Type -AssemblyName System.Drawing

$src = "C:\Users\zlemo\.gemini\antigravity\scratch\fightdijital\logo.jpg"
$dest = "C:\Users\zlemo\.gemini\antigravity\scratch\fightdijital\logo_transparent.png"

$img = [System.Drawing.Bitmap]::FromFile($src)
$bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        # Background is dark. Text is white. Gloves are red and white.
        # Check if it's "dark"
        if ($c.R -lt 110 -and $c.G -lt 80 -and $c.B -lt 80) {
            # Check if it's not strongly red (gloves have high red compared to green/blue)
            if ($c.R -le ($c.G + 50) -or $c.R -lt 90) {
                $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
                continue
            }
        }
        $bmp.SetPixel($x, $y, $c)
    }
}

$bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
