package vkr.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "statistics", schema = "project_manager")
public class Statistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;

    @Column(name = "completed_tasks")
    private Integer completedTasks;

    private Integer allTasks;

    @Column(name = "hours_spent")
    private Long hoursSpent;

    public Statistics(User user, Project project, Integer completedTasks, Integer allTasks, Long hoursSpent) {
        this.user = user;
        this.project = project;
        this.completedTasks = completedTasks;
        this.allTasks = allTasks;
        this.hoursSpent = hoursSpent;
    }
}
