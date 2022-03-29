import React from 'react'
import './addProduct.css'

//imports for image uploader
import  { useState } from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';



export default function AddProduct() {

   
        const [fileList, setFileList] = useState([
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
        ]);
   
        const onChange = ({ fileList: newFileList }) => {
          setFileList(newFileList);
        };
      
        const onPreview = async file => {
          let src = file.url;
          if (!src) {
            src = await new Promise(resolve => {
              const reader = new FileReader();
              reader.readAsDataURL(file.originFileObj);
              reader.onload = () => resolve(reader.result);
            });
          }
          const image = new Image();
          image.src = src;
          const imgWindow = window.open(src);
          imgWindow.document.write(image.outerHTML);
        };
      
 
    



  return (
    <div className='add_product'>
        <div className="upload_img">
            <ImgCrop rotate>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                     >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </ImgCrop>
        </div>
        <div className="upload_info">
            form Side
        </div>


    </div>
  )
}
