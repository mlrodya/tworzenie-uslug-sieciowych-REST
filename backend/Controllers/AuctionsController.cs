using AuctionSystem.API.Services;
using Microsoft.AspNetCore.Mvc;
using AuctionSystem.API.DTOs;

namespace AuctionSystem.API.Controllers
{
    [ApiController]
    [Route("api/auctions")]
    public class AuctionsController : ControllerBase
    {
        private readonly AuctionService _service;

        public AuctionsController(AuctionService service)
        {
            _service = service;
        }

        // GET api/auctions  (lista + filtrowanie po kategorii + paginacja)
        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1, int pageSize = 10, int? categoryId = null)
        {
            var auctions = await _service.GetAllAuctions(page, pageSize, categoryId);
            return Ok(auctions);
        }

        // GET api/auctions/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var auction = await _service.GetAuctionById(id);
            if (auction == null)
                return NotFound(new { message = "Aukcja nie została znaleziona." });

            return Ok(auction);
        }

        // POST api/auctions
        [HttpPost]
        public async Task<IActionResult> Create(CreateAuctionDto dto)
        {
            await _service.CreateAuction(dto);
            return StatusCode(201, new { message = "Aukcja została utworzona." });
        }

        // PUT api/auctions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CreateAuctionDto dto)
        {
            var updated = await _service.UpdateAuction(id, dto);
            if (!updated)
                return NotFound(new { message = "Aukcja nie została znaleziona." });

            return NoContent();
        }

        // DELETE api/auctions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAuction(id);
            if (!deleted)
                return NotFound(new { message = "Aukcja nie została znaleziona." });

            return NoContent();
        }

        // POST api/auctions/{id}/bids  (licytacja)
        [HttpPost("{id}/bids")]
        public async Task<IActionResult> PlaceBid(int id, CreateBidDto dto)
        {
            var result = await _service.PlaceBid(id, dto);

            if (!result.Success)
            {
                if (result.Message == "Auction not found")
                    return NotFound(result.Message);

                return BadRequest(result.Message);
            }

            return Ok(result.Message);
        }

        // GET api/auctions/{id}/bids  (historia ofert)
        [HttpGet("{id}/bids")]
        public async Task<IActionResult> GetBids(int id)
        {
            var bids = await _service.GetBidHistory(id);
            if (bids == null)
                return NotFound(new { message = "Aukcja nie została znaleziona." });

            return Ok(bids);
        }
    }
}
