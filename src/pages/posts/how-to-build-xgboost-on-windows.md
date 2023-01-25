---
title: "How to build XGBoost on Windows - Now with GPU support"
slug: "how-to-build-xgboost-on-windows"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1474502400000"
date: "2016-09-22"
categories: 
  - "software-engineering"
---

- Congratulations to the XGBoost team who have sorted out a lot of issues with XGBoost build on windows.

This is how I managed to build XGBoost on my environment:

- Windows 10
- Visual Studio 2015

**Install CMake**

CMake can be downloaded from here: [https://cmake.org/download/](https://cmake.org/download/)

I downloaded the 64 bit zip file: [https://cmake.org/files/v3.6/cmake-3.6.2-win64-x64.zip](https://cmake.org/files/v3.6/cmake-3.6.2-win64-x64.zip) and unzipped it to c:\\dev\\cmake-3.6.2-win64-x64.

**\[Edit - For GPU Support\] Install CUDA and CUB**

Download and install CUDA from [here](https://developer.nvidia.com/cuda-downloads).

Download and unzip \[CUB\] (https://nvlabs.github.io/cub/).

**Build XGBoost**

To build XGBoost follow these steps:

- git clone [https://github.com/dmlc/xgboost.git](https://github.com/dmlc/xgboost.git)
- cd xgboost
- git submodule init
- git submodule update
- mkdir build
- cd build
- C:\\dev\\cmake-3.6.2-win64-x64\\bin\\cmake.exe .. -G"Visual Studio 14 2015 Win64"
    - Edit: For GPU support use command: C:\\dev\\cmake-3.6.2-win64-x64\\bin\\cmake.exe .. -G"Visual Studio 14 2015 Win64" -DPLUGIN\_UPDATER\_GPU=ON -DCUB\_DIRECTORY=..\\..\\cub-1.6.4
- C:\\Program Files (x86)\\MSBuild\\14.0\\Bin\\msbuild.exe /t:Clean,Rebuild /p:Configuration=Release xgboost.sln

**Done**

Your xgboost files are now in the xgboost\\build\\Release directory.

**Python**

To configure the python wrapper follow these steps:

- cp Release\\libxgboost.dll ..\\windows\\x64\\Release (create ..\\windows\\x64\\Release if required)
- cd ..\\python-package
- python setup.py install

**Using the python wrapper**

<pre>import xgboost
xr = xgboost.XGBRegressor()
xr.fit(X, y)
xr.predict(X_test)</pre>


