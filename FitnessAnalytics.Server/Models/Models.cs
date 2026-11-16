namespace FitnessAnalytics.Server.Models;

public enum Sex
{
    Male = 1,
    Female = 2,
    Other = 3
}

// ---------------------------------------------------------------
// USUÁRIO
// Nesta fase não guarda senha. Quando entrar a autenticação,
// este usuário passa a estender o ASP.NET Core Identity.
// ---------------------------------------------------------------
public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateOnly? BirthDate { get; set; }
    public Sex? Sex { get; set; }
    public decimal? HeightM { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<BodyEvaluation> Evaluations { get; set; } = new();
    public List<Diet> Diets { get; set; } = new();
    public List<Workout> Workouts { get; set; } = new();
    public List<WorkoutSession> WorkoutSessions { get; set; } = new();
}

// ---------------------------------------------------------------
// PESO E MEDIDAS
// Só data e peso são obrigatórios (igual ao formulário do front).
// IMC e metabolismo basal podem ser calculados no back; ficam
// opcionais aqui para aceitar valores vindos do Excel/manual.
// ---------------------------------------------------------------
public class BodyEvaluation
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public DateOnly Date { get; set; }
    public decimal WeightKg { get; set; }
    public decimal? BodyFatPct { get; set; }
    public decimal? MuscleMassKg { get; set; }
    public decimal? WaistCm { get; set; }
    public decimal? Bmi { get; set; }
    public int? BasalMetabolism { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// ---------------------------------------------------------------
// DIETA
// ---------------------------------------------------------------
public class Diet
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public string Goal { get; set; } = string.Empty;
    public int DailyCalories { get; set; }
    public int ProteinGoalG { get; set; }
    public bool IsActive { get; set; } = true;

    public List<Meal> Meals { get; set; } = new();
}

public class Meal
{
    public int Id { get; set; }
    public int DietId { get; set; }
    public Diet Diet { get; set; } = null!;

    public string Name { get; set; } = string.Empty;
    public TimeOnly Time { get; set; }
    public int SortOrder { get; set; }

    public List<MealFood> Foods { get; set; } = new();
    public List<MealLog> Logs { get; set; } = new();
}

public class MealFood
{
    public int Id { get; set; }
    public int MealId { get; set; }
    public Meal Meal { get; set; } = null!;

    // Ex.: "3 ovos mexidos". Se depois quiser calcular macros,
    // dá para quebrar em alimento + quantidade + unidade.
    public string Description { get; set; } = string.Empty;
    public int SortOrder { get; set; }
}

// Registro de refeição concluída (botão "Enviar" + gráfico de adesão).
// Uma refeição só pode ser concluída uma vez por dia.
public class MealLog
{
    public int Id { get; set; }
    public int MealId { get; set; }
    public Meal Meal { get; set; } = null!;

    public DateOnly Date { get; set; }
    public DateTime CompletedAt { get; set; } = DateTime.UtcNow;
}

// ---------------------------------------------------------------
// TREINO
// ---------------------------------------------------------------

// Catálogo de exercícios, para comparar a carga do mesmo exercício
// ao longo do tempo, mesmo em treinos diferentes.
public class Exercise
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? MuscleGroup { get; set; }
}

// Treino A, B, C...
public class Workout
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public string Name { get; set; } = string.Empty;
    public string? Focus { get; set; }
    public bool IsActive { get; set; } = true;

    public List<WorkoutExercise> Exercises { get; set; } = new();
}

// O que está planejado em cada treino (meta, não o realizado)
public class WorkoutExercise
{
    public int Id { get; set; }
    public int WorkoutId { get; set; }
    public Workout Workout { get; set; } = null!;
    public int ExerciseId { get; set; }
    public Exercise Exercise { get; set; } = null!;

    public int TargetSets { get; set; }
    public string TargetReps { get; set; } = string.Empty; // "8-10"
    public int RestSeconds { get; set; }
    public int SortOrder { get; set; }
}

// Um treino realizado em determinado dia
public class WorkoutSession
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = null!;
    public int WorkoutId { get; set; }
    public Workout Workout { get; set; } = null!;

    public DateOnly Date { get; set; }
    public DateTime? FinishedAt { get; set; }

    public List<SetLog> Sets { get; set; } = new();
}

// Série registrada: "série 1, 10 kg, 10 reps"
public class SetLog
{
    public int Id { get; set; }
    public int SessionId { get; set; }
    public WorkoutSession Session { get; set; } = null!;
    public int ExerciseId { get; set; }
    public Exercise Exercise { get; set; } = null!;

    public int SetNumber { get; set; }
    public decimal WeightKg { get; set; }
    public int Reps { get; set; }
}