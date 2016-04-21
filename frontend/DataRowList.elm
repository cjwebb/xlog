module DataRowList where

import DataRow
import Effects exposing (Effects, Never)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Json
import Task

-- Model
type alias Model =
  { rows : List ( ID, DataRow.Model )
  , nextID : ID
  }

type alias ID = Int

init : (Model, Effects Action)
init =
  ({ rows = [ ], nextID = 0 }
  , getData
  )

-- Update
type Action
  = Remove ID
  | Fetch (Maybe (List DataRow.Model))

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    Fetch maybeList ->
      ({ model | rows = zipWithIndex (Maybe.withDefault [] maybeList) }
      , Effects.none
      )
    Remove id ->
      ({ model | rows = List.filter (\(rowID, _) -> rowID /= id) model.rows }
      , Effects.none
      )

zipWithIndex : List a -> List (Int, a)
zipWithIndex list =
  List.map (\x -> (0, x)) list -- todo : actually increment the index.

-- View
view : Signal.Address Action -> Model -> Html
view address model =
  div [] ( List.map (viewRow address) model.rows)

viewRow : Signal.Address Action -> (ID, DataRow.Model) -> Html
viewRow address (id, model) =
  let context =
        DataRow.Context
          (Signal.forwardTo address (always (Remove id)))
  in
    DataRow.viewWithRemoveButton context model

-- Effects
getData : Effects Action
getData =
  Http.get decodeData "http://localhost:3000/api/datatypes"
  |> Task.toMaybe
  |> Task.map Fetch
  |> Effects.task

decodeData : Json.Decoder (List DataRow.Model)
decodeData =
  Json.list Json.string
