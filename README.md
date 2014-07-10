IMG-COMPRESS
============

simple nodejs utility wrapping [image-min](https://www.npmjs.org/package/image-min) and its [imagemin-jpeg-recompress](https://www.npmjs.org/package/imagemin-jpeg-recompress) plugin.

Compress all the .jpg and .png in a given folder (will find the resources recursively)

Install
-------

```bash
$   npm install -g git+https://github.com/MarcelLab/img-compress.git
```

Use
---

```bash
$   imgcompress
```

then answer the questions in the prompt :

-   folder : input folder where to find images (default to current folder)
-   [jpeg] progressive (default true)
-   [jpeg] maxQuality (default 90)
-   [png]  optimizationLevel (default 3) must be between 0 and 7
