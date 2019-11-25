import librosa
import librosa.display

from os import listdir

import os
import numpy as np
import matplotlib.pylab as plt

from os.path import isfile,join



path="E:\M.Sc. Computer Science\Scalable Computing\Projects\example_audio_captchas"
dest = "E:\M.Sc. Computer Science\Scalable Computing\Projects\example_spectogram_captchas"
files = [f for f in listdir(path) if isfile(join(path,f))]


for audio in files:
    x, sr = librosa.load(os.path.join(path, audio))
    # size 128 * 64
    plt.figure(figsize=(1.28, .64), dpi=100)
    plt.axis('off')
    plt.axes([0., 0., 1., 1., ], frameon=False, xticks=[], yticks=[])
    S = librosa.feature.melspectrogram(y=x, sr=sr)
    librosa.display.specshow(librosa.power_to_db(S, ref=np.max))
    plt.savefig(os.path.join(dest, os.path.splitext(audio)[0]+'.png'), bbox_inches=None, pad_inches=0)
    plt.close()