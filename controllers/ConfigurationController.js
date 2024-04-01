class ConfigurationController {
  constructor(configurationService) {
    this.configurationService = configurationService;
  }

  get(req, res) {
    const configuration = this.configurationService.getById(req.params.path);
    if (configuration) {
      res.status(200).json(configuration.data);
    }
    else {
      res.status(404).json({ message: 'Configuration not found.' });
    }
  }

}

module.exports = ConfigurationController;