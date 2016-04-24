import View exposing (root)
import DataRowList exposing (init, update)
import StartApp
import Task
import Effects exposing (Never)

app =
  StartApp.start
    { init = init
    , update = update
    , view = View.root
    , inputs = []
    }

main =
  app.html

port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks

