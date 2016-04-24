module View (root) where

import DataRowList exposing (init, update, view)
import Auth.View

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

root : Signal.Address DataRowList.Action -> DataRowList.Model -> Html
root address model =
  div []
    [
      (view address model)
      , Auth.View.root ]

