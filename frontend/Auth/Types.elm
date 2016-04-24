module Auth.Types (..) where

type Action =
  LoginButtonPressed

type alias Model =
  { authToken : String
  }
