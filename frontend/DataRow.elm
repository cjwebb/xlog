module DataRow (Model, init, viewWithRemoveButton, Context) where

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

-- Model
type alias Model = String

init : String -> Model
init name = name

-- Update
-- don't need this yet

-- View
type alias Context =
  { remove : Signal.Address ()
  }

viewWithRemoveButton : Context -> Model -> Html
viewWithRemoveButton context model =
  div []
    [ div [ countStyle ] [ text (toString model) ]
    , button [ onClick context.remove () ] [ text "X" ]
    ]

countStyle : Attribute
countStyle =
  style
    [ ("font-size", "20px")
    , ("font-family", "monospace")
    , ("display", "inline-block")
    , ("width", "130px")
    , ("text-align", "center")
    ]

