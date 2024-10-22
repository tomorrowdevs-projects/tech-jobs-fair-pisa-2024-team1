<?php

namespace App\Http\Controllers;

use App\Models\trees;
use App\Http\Requests\StoretreesRequest;
use App\Http\Requests\UpdatetreesRequest;

class TreesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(trees::all(), 200); // 200 è lo status code di ritorno
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoretreesRequest $request)
    {
        $request->validate([
            'tipo' => 'required|string|max:255',
            'nome' => 'required|string|max:255',
            'latitudine' => 'required',
            'longitudine' => 'required',
            'stato' => 'required|string|max:255',
            'ultima_segnalazione' => 'required|date_format:Y-m-d',
        ]);

        $tree = trees::create([
            'nome' => $request->nome,
            'tipo' => $request->tipo,
            'latitudine' => $request->latitudine,
            'longitudine' => $request->longitudine,
            'stato' => $request->stato,
            'ultima_segnalazione' => $request->ultima_segnalazione,
            'immagine' => $request->immagine,
        ]);

        return response()->json($tree, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $tree = trees::find($id);

        if ($tree) {

            return response()->json($tree, 200);
        } else {
            return response()->json(['message' => 'Tree not found'], 404);
        }

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatetreesRequest $request, $id)
    {
        $tree = trees::find($id);

        if ($tree) {
            $request->validate([
                'tipo' => 'required|string|max:255',
                'nome' => 'required|string|max:255',
                'latitudine' => 'required',
                'longitudine' => 'required',
                'stato' => 'required|string|max:255',
                'ultima_segnalazione' => 'required|date_format:Y-m-d',
            ]);

            $tree->update([
                'nome' => $request->nome,
                'tipo' => $request->tipo,
                'latitudine' => $request->latitudine,
                'longitudine' => $request->longitudine,
                'stato' => $request->stato,
                'ultima_segnalazione' => $request->ultima_segnalazione,
                'immagine' => $request->immagine,
            ]);
            return response()->json($tree, 200);
        } else {
            return response()->json(['message' => 'Tree not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $tree = trees::find($id);
        if ($tree) {
            $tree->delete();
            return response()->json(['message' => 'Tree deleted'], 200);
        } else {
            return response()->json(['message' => 'Tree not found'], 404);
        }

    }
}
