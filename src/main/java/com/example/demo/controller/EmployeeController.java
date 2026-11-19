package com.example.demo.controller;
import com.example.demo.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
//import java.util.ArrayList;
import com.example.demo.repository.EmployeeRepository;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;





@RestController 
@RequestMapping ("/employees")
public class EmployeeController
 {
    @Autowired
    private EmployeeRepository employeeRepository;
    @GetMapping
    public List<Employee> getAllEmployees()
    {
       // List<Employee> employees =new ArrayList<>();
       // employees.add(new Employee( 1,"ooha","ooha@gmail.com","it"));
        //employees.add(new Employee( 2,"dhatri","ooha@gmail.com","IT" ));
       // employees.add(new Employee( 3,"nitya","ooha@gmail.com","IT" ));

        return employeeRepository.findAll();
    }
    @PostMapping
    public Employee SaveEmployee(@RequestBody Employee employee) {
        //TODO: process POST request
        System.out.println(employee);
        return employeeRepository.save(employee);
    }
    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Integer id,@RequestBody Employee employeeDetails)
    {
        Employee employee=employeeRepository.findById(id).orElseThrow();
        employee.setName(employeeDetails.getName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setDepartment(employeeDetails.getDepartment());
        return employeeRepository.save(employee);
    }
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Integer id)
    {
        employeeRepository.deleteById(id);
        return "Employee deleted successfully..";
    }
} 