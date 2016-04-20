import DataRowList exposing (init, update, view)
import StartApp
import Task
import Effects exposing (Never)

app =
  StartApp.start
    { init = init "Hello"
    , update = update
    , view = view
    , inputs = []
    }

main =
  app.html

port tasks : Signal (Task.Task Never ())
port tasks =
  app.tasks

