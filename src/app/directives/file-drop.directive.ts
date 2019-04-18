import { Directive, EventEmitter, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[fileDrop]'
})


export class FileDropDirective 
{
  // Emit the data when this event occur

  // Emit the FileList when files is drop
  @Output() filesDropped =  new EventEmitter<FileList>();
  
  // Emit boolean value to indicate the file hover or not
  @Output() filesHovered =  new EventEmitter<boolean>();

  constructor() { }

  @HostListener('drop', ['$event']) onDrop($event) 
    {
      $event.preventDefault();
      // preventDefault() because the browser will navigate to the local file path when the files are dropped.

      let transfer = $event.dataTransfer;
      //let fileType = $event.dataTransfer.files[0].type;
      
      // emit
      this.filesDropped.emit(transfer.files);
      this.filesHovered.emit(false);
    }

    @HostListener('dragover', ['$event']) onDragOver($event) 
     {
       event.preventDefault();
       this.filesHovered.emit(true);
     }

   @HostListener('dragleave', ['$event']) onDragLeave($event) 
    {
      this.filesHovered.emit(false);
    }


}
