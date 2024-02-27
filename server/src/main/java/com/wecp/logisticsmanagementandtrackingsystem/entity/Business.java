package com.wecp.logisticsmanagementandtrackingsystem.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.List;

@Entity
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    public Business(String name, String email) {
        this.name = name;
        this.email = email;
        // this.cargos = cargos;
    }

    public Business() {
    }

    private String email;

    @OneToMany(mappedBy = "business",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Cargo> cargos;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Cargo> getCargos() {
        return cargos;
    }

    public void setCargos(List<Cargo> cargos) {
        this.cargos = cargos;
    }
    
}