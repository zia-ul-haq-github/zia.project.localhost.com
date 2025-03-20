<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Log;
use Request;
use File;

class UploadHelper{

  /**
   * Upload Any Types of File.
   *
   * It's not checking the file type which may be checked before pass here in validation
   *
   * @param  string $f               request with file
   * @param  binary $file            file
   * @param  string $name            filename
   * @param  string $target_location location where file will store
   * @return string                  filename
   */

  /**
   * Update File
   * @param  string $f               request with file
   * @param  binary $file            file
   * @param string $name             filename
   * @param  string $target_location location where file will store
   * @param  string $old_location    file location which will delete
   * @return string                  filename
   */

  /**
   * delete file
   * @param  type $location file location that will delete
   * @return type                  null
   */
  public static function deleteFile($location){
    if (File::exists($location)) {
      File::delete($location);
    }
  }

  public static function getFileExtensionFromBase64($base64String){

      // Extract the MIME type from the base64 string
      preg_match('/^data:image\/(\w+);base64,/', $base64String, $matches);
      if (!isset($matches[1])) {
          // If MIME type is not found, return null or handle the error as needed
          return null;
      }
      // Map common image MIME types to file extensions
      $mimeToExt = [
          'jpeg' => 'jpg',
          'png' => 'png',
          'gif' => 'gif',
          // Add more MIME types as needed
      ];
      $extension = $mimeToExt[$matches[1]] ?? null;
      return $extension;

  }

  public static function upload( $base64String, $fileName, $targetLocation ){

      // Decode base64 image
      $image = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64String));
      
      $extension = self::getFileExtensionFromBase64($base64String);
      // Generate unique filename
      $filename = $fileName. '.'.$extension; // You can use any desired file extension
      // Save image to storage
      $path = public_path($targetLocation.'/'. $filename);
      file_put_contents($path, $image);
      $uploaded_file_url = asset($targetLocation.'/' . $filename);
      return $uploaded_file_url;
      
  }

}
