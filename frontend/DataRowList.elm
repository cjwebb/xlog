module DataRowList where

import DataRow
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

-- Model
type alias Model =
  { rows : List ( ID, DataRow.Model )
  , nextID : ID
  }

type alias ID = Int

init : String -> Model
init name =
  { rows = [ (0, name) ]
  , nextID = 1
  }

-- Update
type Action = Remove ID

update : Action -> Model -> Model
update action model =
  case action of
    Remove id ->
      { model | rows = List.filter (\(rowID, _) -> rowID /= id) model.rows }

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

