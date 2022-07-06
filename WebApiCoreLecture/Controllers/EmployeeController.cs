using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApiCoreLecture.Model;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApiCoreLecture.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public EmployeeController(EmployeeContext context)
        {
            _context = context; 
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblEmployee>>> GettblEmployee()
        {
            var employees = (from e in _context.TblEmployee
                             join d in _context.TblDesignation
                             on e.DesignationId equals d.Id

                             select new TblEmployee
                             {
                                 Id = e.Id,
                                 Name = e.Name,
                                 LastName = e.LastName,
                                 Email = e.Email,
                                 Age = e.Age,
                                 DesignationId = e.DesignationId,
                                 Designation = d.Designation,
                                 Doj = e.Doj,
                                 Gender = e.Gender,
                                 IsActive = e.IsActive,
                                 IsMarried = e.IsMarried
                                 
                             }).ToListAsync();

            return await employees;
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblEmployee>> GettblEmployee(int id)
        {
            var tblEmployee = await _context.TblEmployee.FindAsync(id);
            if (tblEmployee == null)
            {
                return NotFound();
            }
            return tblEmployee;
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult<TblEmployee>> PosttblEmployee(TblEmployee tblEmployee)
        {
            _context.TblEmployee.Add(tblEmployee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GettblEmployee", new { id = tblEmployee.Id }, tblEmployee);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PuttblEmployee(int id, TblEmployee tblEmployee)
        {
            
            if (id != tblEmployee.Id)
            {
                return BadRequest();
            }

            _context.Entry(tblEmployee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_context.TblEmployee.FindAsync(id) == null)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblEmployee>> DeletetblEmployee(int id)
        {
            var tblEmployee = await _context.TblEmployee.FindAsync(id);
            if (tblEmployee == null)
            {
                return NotFound();
            }

            _context.TblEmployee.Remove(tblEmployee);
            await _context.SaveChangesAsync();
            return tblEmployee;
        }
    }
}
