module DataRowList where

import DataRow
import Effects exposing (Effects, Never)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

-- Model
type alias Model =
  { rows : List ( ID, DataRow.Model )
  , nextID : ID
  }

type alias ID = Int

init : String -> (Model, Effects Action)
init name =
  ({ rows = [ (0, name) ], nextID = 1 }
  , Effects.none
  )

-- Update
type Action = Remove ID

update : Action -> Model -> (Model, Effects Action)
update action model =
  case action of
    Remove id ->
      ({ model | rows = List.filter (\(rowID, _) -> rowID /= id) model.rows }
      , Effects.none
      )

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

