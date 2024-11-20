# Rate Limiting Documentation

## Overview
This document outlines the rate limiting implementation for authentication endpoints to prevent brute force attacks and protect against denial of service attempts.

## Implementation Details

### Rate Limits

1. **Login Endpoint**
   - 5 attempts per 5 minutes per IP address
   - Sliding window implementation
   - Applies to: `/api/auth/login`

2. **Password Reset Endpoints**
   - Request Token: 3 attempts per hour per IP address
   - Reset Password: 3 attempts per hour per token
   - Sliding window implementation
   - Applies to:
     * POST `/api/auth/reset-password` (request token)
     * PUT `/api/auth/reset-password` (reset with token)

3. **Registration Endpoint**
   - 3 attempts per hour per IP address
   - Sliding window implementation
   - Applies to: `/api/auth/register`

4. **Token Generation**
   - 5 tokens per day per user
   - Applies to all token types:
     * Password reset tokens
     * Email verification tokens (planned)

### Technical Implementation

- Uses Upstash Redis for distributed rate limiting
- Implements sliding window algorithm
- Tracks attempts by IP address
- Provides detailed rate limit headers in responses

### Response Headers

The following headers are included in rate-limited responses:
```
X-RateLimit-Limit: Maximum number of requests allowed
X-RateLimit-Remaining: Number of requests remaining
X-RateLimit-Reset: Timestamp when the rate limit will reset
```

### Rate Limit Response

When rate limit is exceeded, the API returns:
```json
{
  "error": "Too many requests",
  "remainingTime": 12345 // Time in milliseconds until reset
}
```

### Token Generation Limiting

Example rate limit configuration for token endpoints:
```typescript
const tokenLimiter = rateLimit({
  interval: 24 * 60 * 60 * 1000, // 24 hours
  uniqueTokenPerInterval: 500,
  limit: 5 // 5 tokens per day
})

// Example usage in API route
const { success } = await tokenLimiter.limit(userId)
if (!success) {
  return NextResponse.json(
    { error: 'Token generation limit exceeded' },
    { status: 429 }
  )
}
```

## Configuration

### Environment Variables Required

```env
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

## Security Considerations

1. **IP Address Handling**
   - Falls back to "127.0.0.1" if IP cannot be determined
   - Handles IPv4 and IPv6 addresses

2. **Headers**
   - Rate limit information exposed through standard headers
   - No sensitive information included in responses

3. **Distributed Nature**
   - Redis ensures rate limits work across multiple instances
   - Atomic operations prevent race conditions

## Monitoring and Maintenance

1. **Analytics**
   - Rate limit analytics enabled for all endpoints
   - Track through Upstash dashboard

2. **Adjusting Limits**
   - Limits can be adjusted in `rate-limit.ts`
   - Consider monitoring before adjusting limits

## Future Improvements

1. **Additional Features**
   - [ ] Add burst allowance for legitimate traffic spikes
   - [ ] Implement token bucket algorithm option
   - [ ] Add rate limit by user ID for authenticated routes

2. **Monitoring**
   - [ ] Add Prometheus metrics
   - [ ] Create rate limit violation alerts
   - [ ] Add detailed logging for security events
