import DataRowList exposing (init, update, view)
import StartApp.Simple exposing (start)

main =
  start
    { model = init "Hello"
    , update = update
    , view = view
    }

