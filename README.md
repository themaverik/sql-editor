# AT SQL Editor

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Performance

#### Load time without optimisation

```
Load timings (ms)
Fri Apr 02 2021 19:33:15 GMT+0530 (India Standard Time)
Event	Start	Duration	End
Redirect	0	0	0
DNS	1	0	1
Connect	1	0	1
Request	5	1	6
Response	6	1	7
DOM	7	1330	1337
Parse	7	1303	1310
Execute Scripts	1310	0	1310
Content loaded	1310	0	1310
Sub Resources	1310	28	1337
Load event	1337	0	1338
Total


oad timings (ms)
Fri Apr 02 2021 19:33:35 GMT+0530 (India Standard Time)
Event	Start	Duration	End
Redirect	0	0	0
DNS	4	0	4
Connect	4	0	4
Request	22	2	24
Response	24	2	26
DOM	26	1223	1249
Parse	26	1154	1179
Execute Scripts	1179	0	1179
Content loaded	1179	0	1179
Sub Resources	1179	69	1249
Load event	1249	0	1249
Total


Load timings (ms)
Fri Apr 02 2021 19:33:47 GMT+0530 (India Standard Time)
Event	Start	Duration	End
Redirect	0	0	0
DNS	3	0	3
Connect	3	0	3
Request	24	2	26
Response	26	1	27
DOM	27	1265	1292
Parse	27	1209	1236
Execute Scripts	1236	0	1236
Content loaded	1236	0	1236
Sub Resources	1236	56	1292
Load event	1292	1	1293
Total

```


#### Load time with minor optimisation

Added Object.freeze to query result array and using functional templates for non reactive components (E.g. Navbar) 
```
Load timings (ms)
Fri Apr 02 2021 19:31:11 GMT+0530 (India Standard Time)
Event	Start	Duration	End
Redirect	0	0	0
DNS	2	0	2
Connect	2	0	2
Request	6	1	7
Response	7	1	8
DOM	8	1202	1210
Parse	8	1124	1132
Execute Scripts	1132	0	1132
Content loaded	1132	0	1132
Sub Resources	1132	78	1210
Load event	1210	0	1210
Total	1210


Load timings (ms)
Fri Apr 02 2021 19:32:11 GMT+0530 (India Standard Time)
Event	Start	Duration	End
Redirect	0	0	0
DNS	2	0	2
Connect	2	0	2
Request	5	1	6
Response	6	1	7
DOM	7	1222	1228
Parse	7	1167	1174
Execute Scripts	1174	0	1174
Content loaded	1174	0	1174
Sub Resources	1174	55	1228
Load event	1228	0	1229
Total	1229

Load timings (ms)
Fri Apr 02 2021 19:32:27 GMT+0530 (India Standard Time)
Event	Start	Duration	End
Redirect	0	0	0
DNS	3	0	3
Connect	3	0	3
Request	23	2	26
Response	26	1	27
DOM	27	1204	1231
Parse	27	1156	1183
Execute Scripts	1183	0	1183
Content loaded	1183	0	1183
Sub Resources	1183	48	1231
Load event	1231	0	1231
Total	1231
```