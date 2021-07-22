<?php

class Shared{
    var $image;
   var $image_type;
    
    
    
function resize_photo($path,$filename,$filesize,$type,$tmp_name){

        $filename = "";
        $ThirdPart = "";
        $EmailGift = "";
          // Вычисляем случайный индекс массива
          $arr = array('a','b','c','d','e','f',
                 'g','h','i','j','k','l',
                 'm','n','o','p','r','s',
                 't','u','v','x','y','z',
                 'A','B','C','D','E','F',
                 'G','H','I','J','K','L',
                 'M','N','O','P','R','S',
                 'T','U','V','X','Y','Z',
                 '1','2','3','4','5','6',
                 '7','8','9','0');
    // Генерируем пароль
    for($r = 0; $r < 6; $r++)
    {
      // Вычисляем случайный индекс массива
      $index = rand(0, count($arr) - 1);
      $ThirdPart .= $arr[$index];
    }
$Year = date('Y');
 $Mouth = date('m');
 $Day = date('d');
 $NewYear = $Year[2].$Year[3];
 $Hour = date('H');
 $Minutes = date('i');
 $Seconds = date('s');
 
 $filename = $NewYear.$Mouth.$Day.$Hour.$Minutes.$Seconds.$ThirdPart;
 
 
    $quality = 60; //Качество в процентах. В данном случае будет сохранено 60% от начального качества.
    $size = 10485760; //Максимальный размер файла в байтах. В данном случае приблизительно 10 МБ.
   
        switch($type){
           case 'image/jpeg': 
                $source = imagecreatefromjpeg($tmp_name); 
                $hi = imagesx($source)/1000;
                $height = imagesy($source)/$hi;
                $new_image = imagecreatetruecolor(1000, $height);
                imagecopyresampled($new_image, $source, 0, 0, 0, 0, 1000, $height, imagesx($source),  imagesy($source));
                $source = $new_image;
                break; //Создаём изображения по
            case 'image/png': 
                $source = imagecreatefrompng($tmp_name); 
               $hi = imagesx($source)/1000;
                $height = imagesy($source)/$hi;
                $new_image = imagecreatetruecolor(1000, $height);
                
                imagecopyresampled($new_image, $source, 0, 0, 0, 0, 1000, $height, imagesx($source),  imagesy($source));
                $source = $new_image;
                break;  //образцу загруженного  
                
            case 'image/gif': 
                $source = imagecreatefromgif($tmp_name); 
                $hi = imagesx($source)/1000;
                $height = imagesy($source)/$hi;
                $new_image = imagecreatetruecolor(1000, $height);
                
                imagecopyresampled($new_image, $source, 0, 0, 0, 0, 1000, $height, imagesx($source),  imagesy($source));
                $source = $new_image;
                break; //исходя из его формата
            default: return false;
        }
        if(imagejpeg($source, $path.$filename, $quality)){
        //Сохраняем созданное изображение по указанному пути в формате jpg

        imagedestroy($source);//Чистим память
        return $filename;  
        
        } else{
            return false;
        }

}
}

?>