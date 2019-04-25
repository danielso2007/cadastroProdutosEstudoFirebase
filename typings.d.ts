declare var process: Process;

interface Process {
  env: Env;
}

interface Env {
  USERNAME: String
}

interface GlobalEnvironment {
  process: Process;
}
