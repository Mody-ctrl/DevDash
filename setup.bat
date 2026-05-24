@echo off
echo Installing DevDash dependencies...
call npm install
if %errorlevel% neq 0 (
    echo npm install failed. Trying again with --legacy-peer-deps...
    call npm install --legacy-peer-deps
)
echo.
echo Starting DevDash on http://localhost:4028
echo.
call npm run dev
