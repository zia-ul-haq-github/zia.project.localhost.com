<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class FileManagerController extends Controller
{
    
    /**
     * To Fix laravel + antdesign upload tmp
     */
    public function tmpFileUpload(Request $request)
    {
        //
    }

    /**
     * Store a file in a given directory, removing existing files with the same name but different extensions.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeFile(Request $request)
    {

        $request->validate([
            'file' => 'required|file|max:2048', // Max 2MB file
            'directory' => 'required|string'
        ]);

        $file = $request->file('file');

        $filename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME); // Get filename without extension

        $directory = public_path('storage/' . trim($request->directory, '/')) . '/';

        // Ensure the directory exists
        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        // Delete existing files with the same name (different extensions)
        foreach (glob($directory . $filename . '.*') as $existingFile) {
            File::delete($existingFile);
        }

        // Store the new file
        $extension = $file->getClientOriginalExtension();
        $newFilename = $filename . '.' . $extension;
        $file->move($directory, $newFilename);

        return response()->json([
            'message' => 'File uploaded successfully',
            'path' => public_path('storage/'. trim($request->directory, '/') . '/' . $newFilename),
            'url' => asset('storage/'. trim($request->directory, '/') . '/' . $newFilename),
        ]);

    }

    /**
     * Delete all files with a given name in a specified directory (regardless of extension).
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteFile(Request $request)
    {

        $request->validate([
            'filename' => 'required|string',
            'directory' => 'required|string'
        ]);

        $filename = pathinfo($request->filename, PATHINFO_FILENAME);
        $directory = public_path('storage/' . trim($request->directory, '/')) . '/';

        if (!File::exists($directory)) {
            return response()->json(['error' => 'Directory does not exist'], 404);
        }

        // Delete all files with the given name, regardless of extension
        $deleted = false;
        foreach (glob($directory . $filename . '.*') as $existingFile) {
            File::delete($existingFile);
            $deleted = true;
        }

        if ($deleted) {
            return response()->json(['message' => 'Files deleted successfully']);
        } else {
            return response()->json(['error' => 'No files found to delete'], 404);
        }
        
    }

}
