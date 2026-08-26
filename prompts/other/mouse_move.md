@echo off
cd "C:\Users\k430533\Documents\impdocs"

powershell.exe -ExecutionPolicy Bypass -File ".\mouseMove.ps1"
------------------
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$rand = New-Object System.Random

Write-Host "Mouse mover running. Press Ctrl+C to stop."

while ($true) {

    # Remember current mouse position
    $startPos = [System.Windows.Forms.Cursor]::Position

    # Wait 15-30 seconds
    $waitSeconds = $rand.Next(15, 31)
    Start-Sleep -Seconds $waitSeconds

    # If user moved the mouse during the wait, skip this cycle
    $currentPos = [System.Windows.Forms.Cursor]::Position

    if ($currentPos.X -ne $startPos.X -or $currentPos.Y -ne $startPos.Y) {
       # Write-Host "User moved mouse. Skipping cycle."
        continue
    }

    # Generate random offsets
    $dx1 = $rand.Next(-120, 121)
    $dy1 = $rand.Next(-120, 121)

    $dx2 = $rand.Next(-80, 81)
    $dy2 = $rand.Next(-80, 81)

    # Move mouse
    [System.Windows.Forms.Cursor]::Position =
        New-Object System.Drawing.Point(
            ($startPos.X + $dx1),
            ($startPos.Y + $dy1)
        )

    Start-Sleep -Milliseconds ($rand.Next(80, 220))

    [System.Windows.Forms.Cursor]::Position =
        New-Object System.Drawing.Point(
            ($startPos.X + $dx2),
            ($startPos.Y + $dy2)
        )

    Start-Sleep -Milliseconds ($rand.Next(80, 220))

    # Return to original position
    [System.Windows.Forms.Cursor]::Position = $startPos

    # Optional keypress
    [System.Windows.Forms.SendKeys]::SendWait("{F15}")

    #Write-Host "Activity sent at $(Get-Date -Format 'HH:mm:ss')"
}
