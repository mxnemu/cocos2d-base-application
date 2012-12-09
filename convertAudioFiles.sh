#!/usr/bin/bash
cd "$(dirname "$0")"

# You need ffmpeg avconv to run this script

mkdir ./audio/conversions > /dev/null 2>&1
for A in ./audio/*.ogg
do
    filename=`basename ${A}`
    filename="${filename%.*}"  
    
    # overwrite existing files, take ogg and convert to acc and wav
    
    # ogg to aac
    echo "converting ${A} to ./audio/conversions/${filename}.aac ... \c"
    `avconv -v warning -y -i ${A} -strict experimental ./audio/conversions/${filename}.aac`
    echo "done!"
    
    # ogg to wav
    echo "converting ${A} to ./audio/conversions/${filename}.wav ... \c"
    `avconv -v warning -y -i ${A} ./audio/conversions/${filename}.wav`
    echo "done!"
    
    # I disabled this conversion, because you need a license to use mp3 in your app
    # An additional package libmp3lame is also required
    # ogg to mp3
    #echo "converting ${A} to ./audio/conversions/${filename}.mp3 ... \c"
    #`avconv -v warning -y -i ${A} ./audio/conversions/${filename}.mp3`
    #echo "done!"
done
echo "Everything converted"
