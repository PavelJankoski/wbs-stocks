const axiosRetryConfig = {
    retries: 3, // number of retries
    retryDelay: (retryCount) => {
        return retryCount * 2000; // time interval between retries
    },
    retryCondition: (error) => {
        // if retry condition is not specified, by default idempotent requests are retried
        return error.response.status === 429;
    }
}

export default axiosRetryConfig;
