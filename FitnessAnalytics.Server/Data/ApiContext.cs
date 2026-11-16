using FitnessAnalytics.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessAnalytics.Server.Data
{
    public class ApiContext: DbContext
    {
        public ApiContext(DbContextOptions<ApiContext> options) : base(options)
        {
        }

        public DbSet<User> Users => Set<User>();
        public DbSet<BodyEvaluation> BodyEvaluations => Set<BodyEvaluation>();

        public DbSet<Diet> Diets => Set<Diet>();
        public DbSet<Meal> Meals => Set<Meal>();
        public DbSet<MealFood> MealFoods => Set<MealFood>();
        public DbSet<MealLog> MealLogs => Set<MealLog>();

        public DbSet<Exercise> Exercises => Set<Exercise>();
        public DbSet<Workout> Workouts => Set<Workout>();
        public DbSet<WorkoutExercise> WorkoutExercises => Set<WorkoutExercise>();
        public DbSet<WorkoutSession> WorkoutSessions => Set<WorkoutSession>();
        public DbSet<SetLog> SetLogs => Set<SetLog>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ---------- Usuário ----------
            modelBuilder.Entity<User>(e =>
            {
                e.Property(x => x.Name).HasMaxLength(120).IsRequired();
                e.Property(x => x.Email).HasMaxLength(200).IsRequired();
                e.HasIndex(x => x.Email).IsUnique();
                e.Property(x => x.HeightM).HasPrecision(3, 2);
                e.Property(x => x.Sex).HasConversion<string>().HasMaxLength(10);
            });

            // ---------- Peso e medidas ----------
            modelBuilder.Entity<BodyEvaluation>(e =>
            {
                e.Property(x => x.WeightKg).HasPrecision(5, 2);
                e.Property(x => x.BodyFatPct).HasPrecision(4, 2);
                e.Property(x => x.MuscleMassKg).HasPrecision(5, 2);
                e.Property(x => x.WaistCm).HasPrecision(5, 2);
                e.Property(x => x.Bmi).HasPrecision(4, 2);

                // Consultas do histórico/gráficos: por usuário, ordenadas por data
                e.HasIndex(x => new { x.UserId, x.Date });
            });

            // ---------- Dieta ----------
            modelBuilder.Entity<Diet>(e =>
            {
                e.Property(x => x.Goal).HasMaxLength(80).IsRequired();
            });

            modelBuilder.Entity<Meal>(e =>
            {
                e.Property(x => x.Name).HasMaxLength(80).IsRequired();
            });

            modelBuilder.Entity<MealFood>(e =>
            {
                e.Property(x => x.Description).HasMaxLength(200).IsRequired();
            });

            modelBuilder.Entity<MealLog>(e =>
            {
                // Uma refeição só pode ser concluída uma vez por dia
                e.HasIndex(x => new { x.MealId, x.Date }).IsUnique();
            });

            // ---------- Treino ----------
            modelBuilder.Entity<Exercise>(e =>
            {
                e.Property(x => x.Name).HasMaxLength(120).IsRequired();
                e.HasIndex(x => x.Name).IsUnique();
                e.Property(x => x.MuscleGroup).HasMaxLength(60);
            });

            modelBuilder.Entity<Workout>(e =>
            {
                e.Property(x => x.Name).HasMaxLength(60).IsRequired();
                e.Property(x => x.Focus).HasMaxLength(120);
            });

            modelBuilder.Entity<WorkoutExercise>(e =>
            {
                e.Property(x => x.TargetReps).HasMaxLength(20).IsRequired();

                // Não permite apagar um exercício do catálogo que está em uso
                e.HasOne(x => x.Exercise)
                    .WithMany()
                    .HasForeignKey(x => x.ExerciseId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<WorkoutSession>(e =>
            {
                e.HasIndex(x => new { x.UserId, x.Date });

                // Apagar um treino do plano não pode apagar o histórico já realizado
                e.HasOne(x => x.Workout)
                    .WithMany()
                    .HasForeignKey(x => x.WorkoutId)
                    .OnDelete(DeleteBehavior.Restrict);

                // Evita caminhos de exclusão em cascata múltiplos (SQL Server)
                e.HasOne(x => x.User)
                    .WithMany(u => u.WorkoutSessions)
                    .HasForeignKey(x => x.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<SetLog>(e =>
            {
                e.Property(x => x.WeightKg).HasPrecision(6, 2);

                // Histórico de carga por exercício ao longo do tempo
                e.HasIndex(x => new { x.ExerciseId, x.SessionId });

                e.HasOne(x => x.Exercise)
                    .WithMany()
                    .HasForeignKey(x => x.ExerciseId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }
    }
}
