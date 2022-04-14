using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication3.Models;
using Microsoft.EntityFrameworkCore;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private CarsContext? _db;
        public CarsController(CarsContext carsContext)

        {
            _db = carsContext;
        }

        // GET: api/<CarsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> Get()
        {
            return await _db.Car.ToListAsync(); ;
        }

        // GET api/<CarsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> Get(int id)
        {
            Car car = await _db.Car.FirstOrDefaultAsync(x => x.Id == id);
            if (car == null)
                return NotFound();
            return new ObjectResult(car);
        }

        // POST api/<CarsController>
        [HttpPost]
        public async Task<ActionResult<Car>> Post(Car car)
        {
            if (car == null)
            {
                return BadRequest();
            }
            _db.Car.Add(car);
            await _db.SaveChangesAsync();
            return Ok(car);
        }

        // PUT api/<CarsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Car>> Put(Car car)
        {
            if (car == null)
            {
                return BadRequest();
            }
            if (!_db.Car.Any(x => x.Id == car.Id))
            {
                return NotFound();
            }
            _db.Update(car);
            await _db.SaveChangesAsync();
            return Ok(car);
        }

        // DELETE api/<CarsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Car>> Delete(int id)
        {
            Car car = _db.Car.FirstOrDefault(x => x.Id == id);
            if (car == null)
            {
                return NotFound();
            }
            _db.Car.Remove(car);
            await _db.SaveChangesAsync();
            return Ok(car); ;
        }
    }
}
