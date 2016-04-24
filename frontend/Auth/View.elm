module Auth.View (root) where

import Auth.Types exposing (..)

import Effects exposing (Effects, Never)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

root : Html
root =
  div []
    [ button [ ] [ text "Login" ]
    ]
