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
    public class DesignationController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public DesignationController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/<DesignationController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TblDesignation>>> GetTblDesignation()
        {
            return await _context.TblDesignation.ToListAsync();
        }

        // GET api/<DesignationController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TblDesignation>> GetTblDesignation(int id)
        {
            var tblDesignation = await _context.TblDesignation.FindAsync(id);
            if (tblDesignation == null)
            {
                return NotFound();
            }
            return tblDesignation;
        }

        // POST api/<DesignationController>
        [HttpPost]
        public async Task<ActionResult<TblDesignation>> PostTblDesignation(TblDesignation tblDesignation)
        {
            _context.TblDesignation.Add(tblDesignation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTblDesignation", new { id = tblDesignation.Id }, tblDesignation);
        }

        // PUT api/<DesignationController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTblDesignation(int id, TblDesignation TblDesignation)
        {

            if (id != TblDesignation.Id)
            {
                return BadRequest();
            }

            _context.Entry(TblDesignation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (_context.TblDesignation.FindAsync(id) == null)
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

        // DELETE api/<DesignationController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TblDesignation>> DeleteTblDesignation(int id)
        {
            var TblDesignation = await _context.TblDesignation.FindAsync(id);
            if (TblDesignation == null)
            {
                return NotFound();
            }

            _context.TblDesignation.Remove(TblDesignation);
            await _context.SaveChangesAsync();
            return TblDesignation;
        }
    }
}
