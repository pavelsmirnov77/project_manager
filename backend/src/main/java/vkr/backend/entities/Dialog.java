package vkr.backend.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "dialogs", schema = "project_manager")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Dialog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient;

    @JsonBackReference
    @OneToMany(mappedBy = "dialog", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Message> messages;

    @Override
    public String toString() {
        return "dialog{" +
                "id=" + id +
                '}';
    }
}
