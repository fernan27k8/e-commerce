echo "---- Function: CRUDUsuarios----"
cd ./
echo "Packing..."
7z a lambda.zip *
echo "Upload..."
aws lambda update-function-code --function-name CRUDMultimedia --zip-file fileb://lambda.zip --profile default --region us-east-1
del lambda.zip