#!/usr/bin/bash
cd "$(dirname "$0")"

mkdir ./audio/conversions > /dev/null 2>&1
for A in ./audio/*.ogg
do
    filename=`basename ${A}`
    filename="${filename%.*}"
    # overwrite existing files, take ogg and convert to acc and wav
    echo "converting ${A} to ./audio/conversions/${filename}.aac ... \c"
    `avconv -v warning -y -i ${A} -strict experimental ./audio/conversions/${filename}.aac`
    echo "done!"
    echo "converting ${A} to ./audio/conversions/${filename}.wav ... \c"
    `avconv -v warning -y -i ${A} ./audio/conversions/${filename}.wav`
    echo "done!"
done
echo "Everything converted"
