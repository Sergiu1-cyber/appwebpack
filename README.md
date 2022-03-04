# Webpack. Полный курс 2020

https://www.youtube.com/watch?v=eSaF8NXeNsA 

import dinamic - lazyloading
import("lodash").then( (_) => {} )

import in scss .... "~" inseamna - "node modules"

pot folosi normalyze css
in css la inceputul paginei
@import "~normalize.css";
@import "roboto.css"; - aceste importe webpack le poate intelege si utiliza


import jquery
import * from "jquery"
sau
import $ from "jquery"
sau
import "jquery"

conectez botstrap
stilurile bootstrap trebuie sa fie mai jos de cele proprii
in jsfile conectez bootstrap
import 'bootstrap'
in css
import '~bootstrap/css/bootstrap'

Html-Webpack-Config din cutie suporta ejs

Prntru React 
instalez "react" si "react-dom"
in index.jsx
import React from 'react'
import {render} from 'react-dom'
creez app
const App = () => (...);
il montez in index.html
render(<App/>, document.getElementById('app'))

lucrez cu date
import json from '../assets/json.json'
import xml from '../assets/data.xml'
import csv from '../assets/data.csv'


