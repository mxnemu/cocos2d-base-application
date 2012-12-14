#!/usr/bin/bash
cd "$(dirname "$0")"

# You need ffmpeg avconv to run this script
# put your files with lowercase ".ogg" extension into the audio directory
# the script will store converted .aac and .wav versions in audio/conversions/

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
    
    # x to ogg
    #echo "converting ${A} to ./audio/conversions/${filename}.ogg ... \c"
    #`avconv -v warning -y -i ${A} -acodec libvorbis -f ogg ./audio/conversions/${filename}.ogg`
    #echo "done!"
    
    # I disabled this conversion, because you need a license to use mp3 in your app
    # An additional package libmp3lame is also required
    # ogg to mp3
    #echo "converting ${A} to ./audio/conversions/${filename}.mp3 ... \c"
    #`avconv -v warning -y -i ${A} ./audio/conversions/${filename}.mp3`
    #echo "done!"
done

#convert wav files in audio and move them to conversions
for A in ./audio/*.wav
do
    filename=`basename ${A}`
    filename="${filename%.*}"  
    
    # wav to aac
    echo "converting ${A} to ./audio/conversions/${filename}.aac ... \c"
    `avconv -v warning -y -i ${A} -strict experimental ./audio/conversions/${filename}.aac`
    echo "done!"
    
    # wav to ogg
    echo "converting ${A} to ./audio/${filename}.ogg ... \c"
    `avconv -v warning -y -i ${A} -acodec libvorbis -f ogg ./audio/${filename}.ogg`
    echo "done!"
    
    mv "${A} ./audio/conversions/"
    
    # I disabled this conversion, because you need a license to use mp3 in your app
    # An additional package libmp3lame is also required
    # ogg to mp3
    #echo "converting ${A} to ./audio/conversions/${filename}.mp3 ... \c"
    #`avconv -v warning -y -i ${A} ./audio/conversions/${filename}.mp3`
    #echo "done!"
done

echo "Everything converted"
