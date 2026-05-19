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

        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1, int pageSize = 10, int? categoryId = null)
        {
            var auctions = await _service.GetAllAuctions(page, pageSize, categoryId);
            return Ok(auctions);
        }
        [HttpPost]
        public async Task<IActionResult> Create(CreateAuctionDto dto)
        {
            await _service.CreateAuction(dto);
            return Created("", null);
        }
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
    }


}