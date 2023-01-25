---
title: "Download XGBoost Windows x64 Binaries and Executables"
slug: "xgboost-windows-x64-binaries-for-download"
layout: "../../layouts/PostLayout.astro"
authors: 
  - "guido-tapia"
mils: "1474502400000"
date: "2016-09-22"
categories: 
  - "software-engineering"
---

\[Edit\]: It appears the XGBoost team has fixed [pip builds on Windows](https://pypi.org/project/xgboost/#files). There are also [nightly artifacts generated](https://xgboost-ci.net/blue/organizations/jenkins/xgboost-win64/activity). As such, I hereby turn off my nightly builds.

\[Edit\]: These builds (since 19th of Dec 2016) now have GPU support. If this causes any issues let me know and I'll create 2 separate binaries.

I will be attempting to host nightly builds of [XGBoost](https://github.com/dmlc/xgboost). The full list of builds is here: 

<iframe src="http://ssl.picnet.com.au/xgboost/Index.aspx" width="100%" height="200"></iframe>

Any missing days mean a failure of the build script on that night.

**Installing the Python Wrapper**

Please follow these instructions to prepare XGBoost for use with Python. I am placing xgboost in a directory called xgboost\_install\_dir but this can be anything.

- git clone https://github.com/dmlc/xgboost.git xgboost\_install\_dir
- copy libxgboost.dll (downloaded from this page) into the xgboost\_install\_dir\\python-package\\xgboost\\ directory
- cd xgboost\_install\_dir\\python-package\\
- python setup.py install

**Using the Python Library**

<pre>import xgboost
xr = xgboost.XGBRegressor()
xr.fit(X, y)
xr.predict(X_test)</pre>


