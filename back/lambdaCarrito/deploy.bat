echo "---- Function: CRUDCarrito----"
cd ./
echo "Packing..."
7z a lambda.zip index.mjs node_modules src
echo "Upload..."
aws lambda update-function-code --function-name CRUDCarrito --zip-file fileb://lambda.zip --profile default --region us-east-2
del lambda.zip