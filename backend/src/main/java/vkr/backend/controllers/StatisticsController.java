package vkr.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vkr.backend.entities.Statistics;
import vkr.backend.services.StatisticsService;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @GetMapping("/{userId}")
    public ResponseEntity<Statistics> getStatisticsByUserId(@PathVariable Long userId) {
        Statistics statistics = statisticsService.getStatisticsByUserId(userId);
        return ResponseEntity.ok(statistics);
    }

    @GetMapping
    public ResponseEntity<List<Statistics>> getAllStatistics() {
        List<Statistics> statistics = statisticsService.getAllStatistics();
        return ResponseEntity.ok(statistics);
    }
}
