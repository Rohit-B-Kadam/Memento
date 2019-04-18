import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';                       // file system
import * as trash from 'trash';               
import * as compressing from 'compressing';
import * as targz from 'targz';
import * as fstream from 'fstream';
import * as tar from 'tar';
import * as crypto from 'crypto';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  trash: typeof trash;
  compressing: typeof compressing;
  targz: typeof targz;
  fstream: typeof fstream;
  tar: typeof tar;
  crypto: typeof crypto;

  constructor() 
  {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.trash = window.require('trash')
      this.compressing = require('compressing');
      this.targz = require('targz');

      this.fstream = require('fstream');
      this.tar = require('tar');
      this.crypto = require('crypto');

    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
