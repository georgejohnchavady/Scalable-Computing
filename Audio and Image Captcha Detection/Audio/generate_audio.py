#!/usr/bin/env python3

import os
import numpy
import random
import string

import argparse
import captcha.image
from google_speech import Speech

def main():
    parser = argparse.ArgumentParser()
    
    parser.add_argument('--count', help='How many captchas to generate', type=int)
    parser.add_argument('--output-dir', help='Where to store the generated captchas', type=str)
    parser.add_argument('--symbols', help='File with the symbols to use in captchas', type=str)
    args = parser.parse_args()

    if args.count is None:
        print("Please specify the captcha count to generate")
        exit(1)

    if args.output_dir is None:
        print("Please specify the captcha output directory")
        exit(1)

    if args.symbols is None:
        print("Please specify the captcha symbols file")
        exit(1)

    
    symbols_file = open(args.symbols, 'r')
    captcha_symbols = symbols_file.readline().strip()
    symbols_file.close()

    print("Generating captchas with symbol set {" + captcha_symbols + "}")

    if not os.path.exists(args.output_dir):
        print("Creating output directory " + args.output_dir)
        os.makedirs(args.output_dir)

    for i in range(args.count):
        captcha_text = ''.join([random.choice(captcha_symbols) for j in range(args.length)])
        #print(captcha_text)
        lang = "en"
        speech = Speech(captcha_text, lang)
        #speech.play()
        
        #sox_effects = ("speed", "1.5")
        #speech.play(sox_effects)
        image_path = os.path.join(args.output_dir, captcha_text+'.png')
        if os.path.exists(image_path):
            version = 1
            while os.path.exists(os.path.join(args.output_dir, captcha_text + '_' + str(version) + '.png')):
                version += 1
            image_path = os.path.join(args.output_dir, captcha_text + '_' + str(version) + '.png')

        audio_path = os.path.join(args.output_dir, captcha_text + '.mp3')
        speech.save(audio_path)

if __name__ == '__main__':
    main()
