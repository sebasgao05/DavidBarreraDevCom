@echo off

if "%DEPLOY_BUCKET_NAME%"=="" (
  echo DEPLOY_BUCKET_NAME no esta definido. Configura las variables antes de desplegar.
  exit /b 1
)

echo Building application...
call npm run build || exit /b 1

echo Uploading to S3...
aws s3 sync build/ s3://%DEPLOY_BUCKET_NAME% --delete || exit /b 1

if not "%DEPLOY_DISTRIBUTION_ID%"=="" (
  echo Invalidating CloudFront cache...
  aws cloudfront create-invalidation --distribution-id %DEPLOY_DISTRIBUTION_ID% --paths "/*"
)

echo Deployment completed!
pause
